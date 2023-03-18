package com.injagang.config.jwt;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.annotation.PostConstruct;

@Data
@Slf4j
@ConfigurationProperties(prefix = "expiration-time")
public class JwtConfig {

    public Long access;

    public Long refresh;


}
