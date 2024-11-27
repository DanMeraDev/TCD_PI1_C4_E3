package dh.backend.mojarra_tours.service.impl;

import dh.backend.mojarra_tours.dto.CategoryDto;
import dh.backend.mojarra_tours.entity.Category;
import dh.backend.mojarra_tours.exception.ResourceNotFoundException;
import dh.backend.mojarra_tours.mapper.CategoryMapper;
import dh.backend.mojarra_tours.repository.CategoryRepository;
import dh.backend.mojarra_tours.service.ICategoryService;
import dh.backend.mojarra_tours.service.ImageStorageService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements ICategoryService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryServiceImpl.class);

    private CategoryRepository categoryRepository;
    private ImageStorageService imageStorageService;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        //If Dto contains an id, set it to null, and create a new register
        if (categoryDto.getId() != null) {
            throw new IllegalArgumentException("ID should not be provided when creating a new category.");
        }
        // If there is an image, upload it and get the image URL

        String imgUrl = null;
        if (categoryDto.getImage() != null && !categoryDto.getImage().isEmpty()) {
            try{
                imgUrl = imageStorageService.saveImage(categoryDto.getImage(), "categories", categoryDto.getName());
            }catch (Exception e){
                LOGGER.error("Image upload failed for category: " + categoryDto.getName(), e);
                imgUrl = "default.jpg"; // add default image.
            }
        }
        Category category = CategoryMapper.mapToCategory(categoryDto);
        category.setImgUrl(imgUrl);
        Category savedCategory = categoryRepository.save(category);
        LOGGER.info("Saved Category " + savedCategory);
        return CategoryMapper.mapToCategoryDto(savedCategory);
    }

    @Override
    public CategoryDto editCategory(Long id, CategoryDto categoryDto) {
        Category currentCategory = categoryRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("No category found with the given id: " + id));
        //If a name comes update it
        if(categoryDto.getName()!=null && !categoryDto.getName().isEmpty()){ // if is not null or empty
            currentCategory.setName(categoryDto.getName());
        }
        // if an image comes, upload it and update the string URL
        if(categoryDto.getImage()!=null && !categoryDto.getImage().isEmpty()){
            try {
                String imgUrl = imageStorageService.saveImage(categoryDto.getImage(), "categories", categoryDto.getName());
                currentCategory.setImgUrl(imgUrl);
            } catch (Exception e) {
                LOGGER.error("Image upload failed for category: " + categoryDto.getName(), e);
            }
        }
        Category updatedCategory = categoryRepository.save(currentCategory);
        LOGGER.info("Updated Category " + updatedCategory);
        return CategoryMapper.mapToCategoryDto(updatedCategory);
    }

    @Override
    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("No category found with the given id: " + id));
        return CategoryMapper.mapToCategoryDto(category);
    }

    @Override
    public List<CategoryDto> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDto> categoryDtoResponse = new ArrayList<>();
        for (Category category: categories) {
            categoryDtoResponse.add(CategoryMapper.mapToCategoryDto(category));
        }
        return categoryDtoResponse;
    }
}
