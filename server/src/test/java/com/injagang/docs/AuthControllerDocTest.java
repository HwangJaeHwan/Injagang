package com.injagang.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.User;
import com.injagang.repository.UserRepository;
import com.injagang.request.Login;
import com.injagang.request.SignUp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.injagang.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
public class AuthControllerDocTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    void clean() {
        userRepository.deleteAll();
    }



    @Test
    @DisplayName("회원가입")
    void test() throws Exception {

        SignUp signUp = SignUp.builder()
                .loginId("test")
                .password("1234")
                .email("test@gmail.com")
                .nickname("nickname")
                .build();

        String json = objectMapper.writeValueAsString(signUp);

        mockMvc.perform(post("/signup")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andDo(document("auth-signup",
                        requestFields(fieldWithPath("loginId").description("로그인 아이디"),
                                fieldWithPath("password").description("비밀번호"),
                                fieldWithPath("passwordCheck").description("비밀번호 확인"),
                                fieldWithPath("email").description("이메일"),
                                fieldWithPath("nickname").description("닉네임")
                        )));



    }





    @Test
    @DisplayName("로그인")
    void test2() throws Exception {


        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("1234"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);


        Login login = Login.builder()
                .loginId("test")
                .password("1234")
                .build();

        String json = objectMapper.writeValueAsString(login);

        mockMvc.perform(post("/login")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andDo(document("auth-login",
                        requestFields(fieldWithPath("loginId").description("로그인 아이디"),
                                fieldWithPath("password").description("비밀번호")
                                ),
                        responseFields(fieldWithPath("jws").description("암호화된 문자열"))
                        ));



    }

}
