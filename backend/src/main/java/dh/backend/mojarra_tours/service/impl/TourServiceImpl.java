package dh.backend.mojarra_tours.service.impl;

import dh.backend.mojarra_tours.dto.TourDto;
import dh.backend.mojarra_tours.entity.Category;
import dh.backend.mojarra_tours.entity.Tour;
import dh.backend.mojarra_tours.exception.ResourceNotFoundException;
import dh.backend.mojarra_tours.mapper.TourMapper;
import dh.backend.mojarra_tours.repository.CategoryRepository;
import dh.backend.mojarra_tours.repository.TourRepository;
import dh.backend.mojarra_tours.service.ITourService;
import dh.backend.mojarra_tours.service.ImageStorageService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TourServiceImpl implements ITourService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TourServiceImpl.class);

    private TourRepository tourRepository;
    private CategoryRepository categoryRepository;
    private ImageStorageService imageStorageService;
    @Override
    public TourDto createTour(TourDto tourDto) {
        // Initialize the imgUrlList if it does not exist yet.
        List<String> imgUrlList = new ArrayList<>();
        String imgUrl;
        String uniqueIdentifier;
        if (tourDto.getImageFileList() != null && !tourDto.getImageFileList().isEmpty()) {
            try{
                List<MultipartFile> images = tourDto.getImageFileList();
                for (MultipartFile image: images) {
                    uniqueIdentifier = tourDto.getDestination() + "-" + System.currentTimeMillis();
                    imgUrl = imageStorageService.saveImage(image, "tours", uniqueIdentifier);
                    imgUrlList.add(imgUrl);
                }
            }catch (Exception e){
                LOGGER.error("Image upload failed for tour: " + tourDto.getId(), e);
                imgUrl = "default.jpg"; // add default image.
                imgUrlList.add(imgUrl);
            }
        }
        // Associate the image URL list with the tour DTO
        tourDto.setImageUrlList(imgUrlList);

        Category category = categoryRepository.findById(tourDto.getCategoryId())
                .orElseThrow(()->
                        new ResourceNotFoundException("Category not found."));
        Tour tour = TourMapper.mapToTour(tourDto, category);
        Tour savedTour = tourRepository.save(tour);
        LOGGER.info("Saved Tour " + savedTour);
        return TourMapper.mapToTourDto(savedTour);
    }

    @Override
    public TourDto editTour(Long id, TourDto tourDto) {
        //Check if tour exists on database
        Tour currentTour = tourRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("No tour found with the given id: "+ id));
        // Set destination
        if(tourDto.getDestination()!=null){ //ENUM
            currentTour.setDestination(tourDto.getDestination());
        }
        // Set Description
        if(tourDto.getDescription()!=null && !tourDto.getDescription().isEmpty()){
            currentTour.setDescription(tourDto.getDescription());
        }
        // Set category
        if(tourDto.getCategoryId()!=null){
            Category foundCategory = categoryRepository.findById(tourDto.getCategoryId())
                    .orElseThrow(()->
                            new ResourceNotFoundException("No category found with the given id: " +id));

            currentTour.setCategory(foundCategory);
        }
        //Set Climbing Style
        if(tourDto.getClimbingStyle()!=null){
            currentTour.setClimbingStyle(tourDto.getClimbingStyle());
        }
        //Set Day
        if(tourDto.getDay()!=null){
            currentTour.setDay(tourDto.getDay());
        }
        //Set Schedule
        if(tourDto.getSchedule()!=null){
            currentTour.setSchedule(tourDto.getSchedule());
        }
        // Upload and set Images
        if(tourDto.getImageFileList()!=null && !tourDto.getImageFileList().isEmpty()){
            List<String> imgUrlList = new ArrayList<>();
            String imgUrl;
            try{
                for (MultipartFile image: tourDto.getImageFileList()) {
                    String uniqueIdentifier = tourDto.getDestination() + "-" + System.currentTimeMillis();
                    imgUrl = imageStorageService.saveImage(image, "tours", uniqueIdentifier);
                    imgUrlList.add(imgUrl);
                }
            } catch(Exception e){
                LOGGER.error("Image upload failed for tour: " + tourDto.getId(), e);
                imgUrl = "default.jpg"; // add default image.
                imgUrlList.add(imgUrl);
            }
            currentTour.setImageUrlList(imgUrlList);
        }

        Tour updatedTour = tourRepository.save(currentTour);
        LOGGER.info("TOUR UPDATED" + updatedTour);
        return TourMapper.mapToTourDto(updatedTour);
    }

    @Override
    public TourDto getTourById(Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("No tour found with the given id: " + id));
        return TourMapper.mapToTourDto(tour);
    }

    @Override
    public List<TourDto> getTours() {
        List<Tour> tours = tourRepository.findAll();
        List<TourDto> tourDtoResponse = new ArrayList<>();
        for (Tour tour: tours) {
            tourDtoResponse.add(TourMapper.mapToTourDto(tour));
        }
        return tourDtoResponse;
    }

    @Override
    public void deleteTour(Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("No tour found with the given id: " + id));
        // Si no se arroja ningún error, entonces quiere decir que el tour existe, se procede a eliminarlo.
        tourRepository.delete(tour);
        LOGGER.info("Tour With id " + id + " deleted");
    }
}
