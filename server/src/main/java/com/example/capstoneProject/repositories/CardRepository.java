package com.example.capstoneProject.repositories;

import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.models.Cards.Melee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByRowType(String rowType);
}
