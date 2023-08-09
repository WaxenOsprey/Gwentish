package com.example.capstoneProject.repositories;

import com.example.capstoneProject.controller.PlayerController;
import com.example.capstoneProject.models.Cards.Card;
import com.example.capstoneProject.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    Player findByName(String Name);
}
