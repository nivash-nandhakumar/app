package com.vexura.controller;

import com.vexura.entity.Agent;
import com.vexura.entity.AgentAppointment;
import com.vexura.entity.User;
import com.vexura.service.AgentAppointmentService;
import com.vexura.service.AgentService;

import com.vexura.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/agents")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @Autowired
    private UserService userService;

    @Autowired
    private AgentAppointmentService agentAppointmentService;

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

            User user = userService.getUserByEmail(email)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setName(name);
                        newUser.setEmail(email);
                        newUser.setPassword("defaultPassword123"); // Should be changed on first login
                        newUser.setMobile(mobile);
                        newUser.setCity(city);
                        return userService.createUser(newUser);
                    });

            if (user.getRole() != User.UserRole.AGENT) {
                user.setRole(User.UserRole.AGENT);
                user = userService.updateUser(user.getId(), user);
            }

            if (agentService.getAgentByUser(user).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "This user is already an agent."
                ));
            }

            Agent agent = new Agent();
            agent.setUser(user);
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
            AgentAppointment appointment = new AgentAppointment();
            appointment.setName((String) applicationData.get("name"));
            appointment.setEmail((String) applicationData.get("email"));
            appointment.setMobile((String) applicationData.get("mobile"));
            appointment.setCity((String) applicationData.get("city"));
            String dob = (String) applicationData.get("dateOfBirth");
            if (dob != null && !dob.isEmpty()) {
                appointment.setDateOfBirth(LocalDate.parse(dob));
            }

            AgentAppointment savedAppointment = agentAppointmentService.createAppointment(appointment);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "appointment", savedAppointment,
                    "message", "Agent application submitted successfully."
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