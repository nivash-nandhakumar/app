package com.vexura.repository;

import com.vexura.entity.Agent;
import com.vexura.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgentRepository extends JpaRepository<Agent, Long> {
    
    Optional<Agent> findByAgentId(String agentId);
    
    Optional<Agent> findByUser(User user);
    
    List<Agent> findByRole(Agent.AgentRole role);
    
    @Query("SELECT a FROM Agent a JOIN a.districts d WHERE d = :district")
    List<Agent> findByDistrict(@Param("district") String district);
    
    @Query("SELECT a FROM Agent a WHERE a.role = :role AND :district MEMBER OF a.districts")
    List<Agent> findByRoleAndDistrict(@Param("role") Agent.AgentRole role, 
                                    @Param("district") String district);
}
