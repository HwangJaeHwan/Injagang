package com.injagang.service;

import com.injagang.domain.User;
import com.injagang.exception.*;
import com.injagang.repository.UserRepository;
import com.injagang.request.Login;
import com.injagang.request.PasswordChange;
import com.injagang.request.SignUp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Long login(Login login) {

        log.info("하이요");

        User user = userRepository.findUserByLoginId(login.getLoginId()).orElseThrow(InvalidLoginInfoException::new);

        boolean matches = passwordEncoder.matches(login.getPassword(), user.getPassword());

        if (!matches) {
            throw new InvalidLoginInfoException();
        }

        return user.getId();

    }

    public void signUp(SignUp signUp) {

        if (userRepository.findUserByLoginId(signUp.getLoginId()).isPresent()) {
            throw new DuplicateLoginIdException();
        }

        if (userRepository.findUserByNickname(signUp.getNickname()).isPresent()) {
            throw new DuplicateNicknameException();
        }

        User user = User.builder()
                .loginId(signUp.getLoginId())
                .password(passwordEncoder.encode(signUp.getPassword()))
                .nickname(signUp.getNickname())
                .email(signUp.getEmail())
                .role("USER")
                .build();

        userRepository.save(user);

    }


    public void changePassword(Long userId, PasswordChange passwordChange) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (passwordEncoder.matches(passwordChange.getNowPassword(), user.getPassword())) {
            throw new PasswordDiffException();
        }

        if (!passwordChange.getChangePassword().equals(passwordChange.getChangePasswordCheck())) {
            throw new PasswordCheckException();
        }

        user.changePassword(passwordEncoder.encode(passwordChange.getChangePassword()));


    }

    public void nicknameChange(Long userId, String changeNickname) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (userRepository.findUserByNickname(changeNickname).isPresent()) {
            throw new DuplicateNicknameException();
        }

        user.changeNickname(changeNickname);


    }


}
