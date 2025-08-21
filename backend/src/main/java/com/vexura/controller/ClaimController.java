package com.vexura.controller;

import com.vexura.entity.Claim;
import com.vexura.entity.Policy;
import com.vexura.entity.User;
import com.vexura.service.ClaimService;
import com.vexura.service.PolicyService;
import com.vexura.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/claims")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @Autowired
    private PolicyService policyService;

    @Autowired
    private UserService userService;

    private final String UPLOAD_DIR = "uploads/claims/";

    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> getClaimById(@PathVariable Long id) {
        return claimService.getClaimById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/claim/{claimId}")
    public ResponseEntity<Claim> getClaimByClaimId(@PathVariable String claimId) {
        return claimService.getClaimByClaimId(claimId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public List<Claim> getClaimsByCustomerId(@PathVariable String customerId) {
        return claimService.getClaimsByCustomerId(customerId);
    }

    @GetMapping("/pending")
    public List<Claim> getPendingClaims() {
        return claimService.getPendingClaims();
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createClaim(@RequestBody Map<String, Object> claimData) {
        try {
            String policyId = (String) claimData.get("policyId");
            String customerId = (String) claimData.get("customerId");

            Policy policy = policyService.getPolicyByPolicyId(policyId)
                    .orElseThrow(() -> new RuntimeException("Policy not found"));

            User user = userService.getUserByCustomerId(customerId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Claim claim = new Claim();
            claim.setPolicy(policy);
            claim.setUser(user);
            claim.setClaimAmount(new java.math.BigDecimal(claimData.get("claimAmount").toString()));
            claim.setReason((String) claimData.get("reason"));
            claim.setProofDocument((String) claimData.get("proofDocument")); // Set Base64 string

            Claim createdClaim = claimService.createClaim(claim);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "claim", createdClaim,
                "message", "Claim submitted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Error creating claim: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Claim> updateClaimStatus(@PathVariable Long id, 
                                                  @RequestBody Map<String, String> statusData) {
        try {
            Claim.ClaimStatus status = Claim.ClaimStatus.valueOf(statusData.get("status"));
            String remark = statusData.get("remark");
            String approvedBy = statusData.get("approvedBy");

            Claim updatedClaim = claimService.updateClaimStatus(id, status, remark, approvedBy);
            return ResponseEntity.ok(updatedClaim);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClaim(@PathVariable Long id) {
        claimService.deleteClaim(id);
        return ResponseEntity.ok().build();
    }
}