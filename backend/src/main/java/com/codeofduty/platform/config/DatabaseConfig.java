package com.codeofduty.platform.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Value("${SPRING_DATASOURCE_PASSWORD:Vaish@005210}")
    private String dbPassword;

    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://aws-1-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require");
        config.setUsername("postgres.juzkwhhkmrcyllwrhqba");
        config.setPassword(dbPassword);
        config.setDriverClassName("org.postgresql.Driver");

        config.setMaximumPoolSize(4); 
        config.setMinimumIdle(1);
        config.setConnectionTimeout(20000);
        config.setIdleTimeout(300000);
        config.setMaxLifetime(540000);
        config.setConnectionTestQuery("SELECT 1");

        return new HikariDataSource(config);
    }
}