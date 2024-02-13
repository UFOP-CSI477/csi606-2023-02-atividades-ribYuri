package com.api.fakestore.utils;

import com.api.fakestore.api.FakeStoreClient;
import com.api.fakestore.models.CategoryModel;
import com.api.fakestore.models.ProductModel;
import com.api.fakestore.outputs.ProductOutput;
import com.api.fakestore.repositories.CategoriesRepository;
import com.api.fakestore.repositories.ProductsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PopulateDatabase {

    private final CategoriesRepository categoriesRepository;
    private final ProductsRepository productsRepository;

    private final FakeStoreClient fakeStoreClient;

    public PopulateDatabase(CategoriesRepository categoriesRepository, ProductsRepository productsRepository, FakeStoreClient fakeStoreClient) {
        this.categoriesRepository = categoriesRepository;
        this.productsRepository = productsRepository;
        this.fakeStoreClient = fakeStoreClient;
    }

    public void categories() {
        if (isCategoriesTableNotEmpty()) {
            log.info("Categories table already has entries! No data was inserted.");
            return;
        }

        List<String> categories = fakeStoreClient.getAllCategories().getBody();
        for (String category : categories) {
            categoriesRepository.save(CategoryModel.builder().name(category).build());
        }
        log.info("categories(): Categories data insert with success!");
    }

    public void products() {
        if(isProductsTableNotEmpty()) {
            log.info("Products table already has entries! No data was inserted.");
            return;
        }

        List<ProductOutput> products = fakeStoreClient.getAllProducts().getBody();
        for (ProductOutput product : products) {
            Optional<CategoryModel> category = categoriesRepository.findByName(product.getCategory());
            if (category.isEmpty()) continue;

            productsRepository.save(ProductModel.builder()
                    .title(product.getTitle())
                    .price(product.getPrice())
                    .description(product.getDescription())
                    .category(category.get())
                    .image(product.getImage())
                    .count(product.getRating().getCount())
                    .rate(product.getRating().getRate())
                    .build());
        }
        log.info("products(): Products data insert with success!");
    }


    public boolean isCategoriesTableNotEmpty() {
        List<CategoryModel> category = categoriesRepository.findAll();
        if (category.isEmpty()) return false;

        return true;
    }

    public boolean isProductsTableNotEmpty() {
        List<ProductModel> products = productsRepository.findAll();
        if (products.isEmpty()) return false;

        return true;
    }
}
