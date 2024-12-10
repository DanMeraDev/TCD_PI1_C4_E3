package dh.backend.mojarra_tours.entity;

import dh.backend.mojarra_tours.enums.Diet;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity // Add Entity Annotation.
@Table(name="Reservations") //Plural Name for table
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //Primary Key

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Specifies the foreign key column
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @Enumerated(EnumType.STRING)
    private Diet diet; // VEGAN; NORMAL; VEGETARIAN

    @Column(name = "include_lunch", nullable = false)
    private Boolean includeLunch; // Aditional Pay for lunch.

    @Column(name = "include_equipment", nullable = false)
    private Boolean includeEquipment; // Aditional Pay For Equipment.

    private LocalDate date;

    @Column(name = "total_cost", nullable = false)
    private Double totalCost;

}
