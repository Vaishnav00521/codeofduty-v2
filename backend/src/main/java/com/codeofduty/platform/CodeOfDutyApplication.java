package com.codeofduty.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main application class for CodeofDuty Backend.
 * Parametric Insurance for Q-Commerce delivery workers.
 */
@SpringBootApplication
@EnableJpaRepositories
public class CodeOfDutyApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeOfDutyApplication.class, args);
    }
}
