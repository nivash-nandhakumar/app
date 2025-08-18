package com.vexura.controller;

import com.vexura.entity.Agent;
import com.vexura.entity.User;
import com.vexura.service.AgentService;
import com.vexura.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/agents")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Agent> getAllAgents() {
        return agentService.getAllAgents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable Long id) {
        return agentService.getAgentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/agent/{agentId}")
    public ResponseEntity<Agent> getAgentByAgentId(@PathVariable String agentId) {
        return agentService.getAgentByAgentId(agentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createAgent(@RequestBody Map<String, Object> agentData) {
        try {
            String name = (String) agentData.get("name");
            String email = (String) agentData.get("email");
            String mobile = (String) agentData.get("mobile");
            String city = (String) agentData.get("city");
            
            // Create user first
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword("defaultPassword123"); // Should be changed on first login
            user.setMobile(mobile);
            user.setCity(city);
            user.setRole(User.UserRole.AGENT);
            
            User createdUser = userService.createUser(user);

            // Create agent
            Agent agent = new Agent();
            agent.setUser(createdUser);
            agent.setRole(Agent.AgentRole.valueOf((String) agentData.get("role")));
            agent.setDistricts((List<String>) agentData.get("districts"));

            Agent createdAgent = agentService.createAgent(agent);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "agent", createdAgent,
                "message", "Agent created successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Error creating agent: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/apply")
    public ResponseEntity<Map<String, Object>> applyAsAgent(@RequestBody Map<String, Object> applicationData) {
        try {
            String name = (String) applicationData.get("name");
            String email = (String) applicationData.get("email");
            String mobile = (String) applicationData.get("mobile");
            String city = (String) applicationData.get("city");
            String dob = (String) applicationData.get("dateOfBirth");

            // Create user with AGENT role
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword("tempPassword123"); // Should be changed
            user.setMobile(mobile);
            user.setCity(city);
            user.setRole(User.UserRole.AGENT);
            if (dob != null) {
                user.setDateOfBirth(java.time.LocalDate.parse(dob));
            }

            User createdUser = userService.createUser(user);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "user", createdUser,
                "message", "Agent application submitted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Error submitting application: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable Long id, @RequestBody Agent agentDetails) {
        try {
            Agent updatedAgent = agentService.updateAgent(id, agentDetails);
            return ResponseEntity.ok(updatedAgent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgent(@PathVariable Long id) {
        agentService.deleteAgent(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/district/{district}")
    public List<Agent> getAgentsByDistrict(@PathVariable String district) {
        return agentService.getAgentsByDistrict(district);
    }
}
