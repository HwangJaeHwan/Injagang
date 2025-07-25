package com.injagang.controller;

import com.injagang.exception.InJaGangException;
import com.injagang.exception.InvalidRefreshTokenException;
import com.injagang.response.ErrorResponse;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ErrorResponse validationException(MethodArgumentNotValidException e) {


        ErrorResponse error = ErrorResponse.builder()
                .code("400")
                .message("잘못된 입력입니다.")
                .build();
        for (FieldError fieldError : e.getFieldErrors()) {

            error.addValidation(fieldError.getField(), fieldError.getDefaultMessage());

        }

        return error;
    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ErrorResponse CookieException(MissingRequestCookieException e) {

        return ErrorResponse.builder()
                .code("401")
                .message("Cookie에 RefreshToken이 존재하지 않습니다.")
                .build();
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> inJaGangException(InJaGangException e) {


        ErrorResponse body = ErrorResponse.builder()
                .code(e.getStatusCode())
                .message(e.getMessage())
                .build();


        return ResponseEntity.status(Integer.parseInt(e.getStatusCode())).body(body);


    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ErrorResponse JwtException(JwtException e) {

        return ErrorResponse.builder()
                .message(e.getMessage())
                .code("401")
                .build();
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public ErrorResponse refreshTokenException(InvalidRefreshTokenException e,
                                               HttpServletResponse response) {

        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();


        response.addHeader(SET_COOKIE, deleteCookie.toString());


        return ErrorResponse.builder()
                .code("401")
                .message(e.getMessage())
                .build();
    }


}
