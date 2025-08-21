package com.vexura.service;

import com.vexura.entity.AgentAppointment;
import com.vexura.repository.AgentAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgentAppointmentService {

    @Autowired
    private AgentAppointmentRepository agentAppointmentRepository;

    public AgentAppointment createAppointment(AgentAppointment appointment) {
        return agentAppointmentRepository.save(appointment);
    }
}
