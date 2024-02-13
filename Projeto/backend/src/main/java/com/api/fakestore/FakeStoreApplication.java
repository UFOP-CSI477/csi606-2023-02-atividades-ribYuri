package com.api.fakestore;

import com.api.fakestore.utils.PopulateDatabase;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.context.annotation.Bean;

@EnableFeignClients
@ImportAutoConfiguration({FeignAutoConfiguration.class})
@SpringBootApplication
public class FakeStoreApplication {

    final
    PopulateDatabase populateDatabase;

    public FakeStoreApplication(PopulateDatabase populateDatabase) {
        this.populateDatabase = populateDatabase;
    }

    @Bean
    public void verifyDataBase() {
        populateDatabase.categories();
        populateDatabase.products();
    }

    public static void main(String[] args) {
        SpringApplication.run(FakeStoreApplication.class, args);
    }


}
