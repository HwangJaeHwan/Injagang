package com.injagang;

import com.injagang.config.AppConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppConfig.class)
@SpringBootApplication
public class InjagangApplication {

	public static void main(String[] args) {
		SpringApplication.run(InjagangApplication.class, args);
	}

}
