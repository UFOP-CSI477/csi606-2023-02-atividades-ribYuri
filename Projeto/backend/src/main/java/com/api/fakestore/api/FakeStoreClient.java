package com.api.fakestore.api;

import com.api.fakestore.outputs.ProductOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "fakeStoreUrl", url = "https://fakestoreapi.com")
public interface FakeStoreClient {

    @GetMapping("/products/categories")
    ResponseEntity<List<String>> getAllCategories();

    @GetMapping("/products")
    ResponseEntity<List<ProductOutput>> getAllProducts();
}
