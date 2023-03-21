package com.injagang;

import com.injagang.config.AppConfig;
import com.injagang.config.jwt.JwtConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@ConfigurationPropertiesScan
@SpringBootApplication
public class InjagangApplication {

	public static void main(String[] args) {
		SpringApplication.run(InjagangApplication.class, args);
	}

}
