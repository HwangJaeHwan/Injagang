package com.injagang.config.jwt;

import lombok.Data;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;


@Slf4j
//@Getter
@Data
@ConfigurationProperties(prefix = "expiration-time")
public class JwtConfig {

    private Long access;

    private Long refresh;

//    public JwtConfig(Long access, Long refresh) {
//        this.access = access;
//        this.refresh = refresh;
//    }
}
