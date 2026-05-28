package com.injagang;

import com.injagang.config.AppConfig;
import com.injagang.config.jwt.JwtConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@ConfigurationPropertiesScan
@EnableJpaAuditing
@SpringBootApplication
public class InjagangApplication {

	public static void main(String[] args) {
		SpringApplication.run(InjagangApplication.class, args);
	}

}
