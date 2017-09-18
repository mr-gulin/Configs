package entities;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author gulin
 */
//@ApplicationPath("api")
@Path("generic")
public class Generic {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of GenericResource
     */
    public Generic() {
    }

    /**
     * Retrieves representation of an instance of Entities.GenericResource
     *
     * @return an instance of java.lang.String
     */
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getJson() {
//        //TODO return proper representation object
//        throw new UnsupportedOperationException();
//    }
    @GET
//    @Produces(MediaType.APPLICATION_JSON)
    @Path("hello")
    public String hello(@QueryParam("name") String name) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = mapper.createObjectNode();

        OutputStream outputStream = new ByteArrayOutputStream();
        // Convert object to JSON string and save into a file directly

        // Convert object to JSON string
        rootNode.put("message", "Hello");
        ObjectNode childNode = rootNode.putObject("place"); // создание дочернего объекта Place
        childNode.put("name", name);
        try {
            mapper.writeValue(outputStream, childNode); // запись json строки в стрим
        } catch (IOException ex) {
            Logger.getLogger(Generic.class.getName()).log(Level.SEVERE, null, ex);
        }

        // Convert object to JSON string and pretty print
        return outputStream.toString();
    }

    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    @Path("hello")
    public String test() {
        return "Something";
    }

    /**
     * PUT method for updating or creating an instance of GenericResource
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
