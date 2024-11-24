package dh.backend.mojarra_tours.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import dh.backend.mojarra_tours.service.ImageStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Profile("cloudinary")
public class CloudinaryImageStorageServiceImpl implements ImageStorageService {

    private final Cloudinary cloudinary;

    public CloudinaryImageStorageServiceImpl(
            @Value("${cloudinary.cloud_name}") String cloudName,
            @Value("${cloudinary.api_key}") String apiKey,
            @Value("${cloudinary.api_secret}") String apiSecret) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    @Override
    public String saveImage(MultipartFile imageFile, String folder, String identifier) throws IOException {
        // Define the public ID for the image (folder/identifier)
        String publicId = folder + "/" + identifier + "-" + imageFile.getOriginalFilename();

        // Upload the image to Cloudinary
        Map<String, Object> uploadResult = cloudinary.uploader().upload(imageFile.getBytes(),
                ObjectUtils.asMap(
                        "public_id", publicId,
                        "folder", folder,
                        "resource_type", "image"
                )
        );

        // Return the secure URL from the upload response
        return (String) uploadResult.get("secure_url");
    }
}
