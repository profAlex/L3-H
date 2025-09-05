import request from 'supertest';
import express from "express";
import {setupApp} from "../src/setup-app";
import {BlogInputModel} from "../src/types/blog-input-model";
import {BLOGS_PATH} from "../src/routers/router-pathes";
import {dataRepository} from "../src/repository/blogger-repository";
import {HttpStatus} from "../src/core/http-statuses";

describe("Test API for managing blogs(bloggers)", () =>{

    const testApp = express();
    setupApp(testApp);

    const correctBlogInput: BlogInputModel = {
        name: "MI OBRECHENI",
        description: "norm takoy blog",
        websiteUrl: "https://mi-obrecheni.herokuapp.com/",
    };

    it("GET '/api/blogs/' - should respond with a list of bloggers (2 entries total)", async() => {
        const res = await request(testApp).get(`${BLOGS_PATH}/`);

        const entriesCount = Object.keys(res.body).length;
        expect(entriesCount).toBe(2);

        expect(res.status).toBe(HttpStatus.Ok);
    });

    it("POST '/api/blogs/' - should add a blog to the repository", async() => {
        expect(dataRepository.returnLength()).toBe(2);

        const res = await request(testApp).post(`${BLOGS_PATH}/`).set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5').send(correctBlogInput);
        expect(dataRepository.returnLength()).toBe(3);

        // console.log(res.body);
        const propertyCount = Object.keys(res.body).length;
        expect(propertyCount).toBe(4);

        expect(res.body.id).toBeDefined();
        expect(typeof res.body.id).toBe('string');
        expect(res.body).toHaveProperty('name', 'MI OBRECHENI');
        expect(res.body).toHaveProperty('description', 'norm takoy blog');
        expect(res.body).toHaveProperty('websiteUrl', 'https://mi-obrecheni.herokuapp.com/');

        expect(res.status).toBe(HttpStatus.Created);
    });

    it("POST '/api/blogs/' - shouldn't be able to add a blog to the repository with wrong login/password", async() => {
        expect(dataRepository.returnLength()).toBe(3);

        const res = await request(testApp).post(`${BLOGS_PATH}/`).set('Authorization', 'Basic ' + '111111').send(correctBlogInput);
        expect(res.status).toBe(HttpStatus.Unauthorized);

        const anotherRes = await request(testApp).post(`${BLOGS_PATH}/`).set('Authorization', '111111 ' + 'YWRtaW46cXdlcnR5').send(correctBlogInput);
        expect(anotherRes.status).toBe(HttpStatus.Unauthorized);
    });

    it("GET '/api/blogs/{id}' - should respond with a BlogViewModel-formatted info about a requested blog", async() => {
        expect(dataRepository.returnLength()).toBe(3);

        const res = await request(testApp).get(`${BLOGS_PATH}/001`);

        const propertyCount = Object.keys(res.body).length;
        expect(propertyCount).toBe(4);

        expect(res.body).toHaveProperty('id', '001');
        expect(res.body).toHaveProperty('name', 'blogger_001');
        expect(res.body).toHaveProperty('description', 'takoy sebe blogger...');
        expect(res.body).toHaveProperty('websiteUrl', 'https://takoy.blogger.com');

        expect(res.status).toBe(HttpStatus.Ok);
    });

    it("GET '/api/blogs/{id}' - shouldn't be able to find anything because of non-existing id and return proper return-code", async() => {
        const res = await request(testApp).get(`${BLOGS_PATH}/0000`);
        expect(res.status).toBe(HttpStatus.NotFound);
    });

    it("PUT '/api/blogs/{id}' - should correctly update a blog", async() => {
        expect(dataRepository.returnLength()).toBe(3);

        const updatedBlogInput: BlogInputModel = {
            name: "updated name",
            description: "updated description",
            websiteUrl: "https://takoy.blogger.com"
        };

        const res = await request(testApp).put(`${BLOGS_PATH}/001`).set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5').send(updatedBlogInput);
        expect(dataRepository.returnLength()).toBe(3);
        expect(res.status).toBe(HttpStatus.NoContent);

        const anotherResults = await request(testApp).get(`${BLOGS_PATH}/001`);
        expect(anotherResults.status).toBe(HttpStatus.Ok);
        expect(anotherResults).toBeDefined();
        expect(anotherResults.body).toHaveProperty('id', '001');
        expect(anotherResults.body).toHaveProperty('name', 'updated name');
        expect(anotherResults.body).toHaveProperty('description', 'updated description');
        expect(anotherResults.body).toHaveProperty('websiteUrl', 'https://takoy.blogger.com');
    });

    it("PUT '/api/blogs/{id}' - should give a proper error message to a non-existing id", async() => {
        expect(dataRepository.returnLength()).toBe(3);

        const updatedBlogInput: BlogInputModel = {
            name: "updated name",
            description: "updated description",
            websiteUrl: "https://takoy.blogger.com"
        };

        const res = await request(testApp).put(`${BLOGS_PATH}/0000`).set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5').send(updatedBlogInput);
        expect(res.status).toBe(HttpStatus.NotFound);
    });

    it("PUT '/api/blogs/{id}' - should give a proper error message to an incorrect login/password pair", async() => {
        expect(dataRepository.returnLength()).toBe(3);

        const updatedBlogInput: BlogInputModel = {
            name: "updated name",
            description: "updated description",
            websiteUrl: "https://takoy.blogger.com"
        };

        const res = await request(testApp).put(`${BLOGS_PATH}/001`).set('Authorization', 'Basic ' + '1111111').send(updatedBlogInput);
        expect(res.status).toBe(HttpStatus.Unauthorized);

        const anotherRes = await request(testApp).put(`${BLOGS_PATH}/001`).set('Authorization', '1111111 ' + 'YWRtaW46cXdlcnR5').send(updatedBlogInput);
        expect(anotherRes.status).toBe(HttpStatus.Unauthorized);
    });

    it("DELETE '/api/blogs/{id}' - shouldn't be able to delete a blog because of incorrect login/password pair", async() => {
        expect(dataRepository.returnLength()).toBe(3);

        const res = await request(testApp).delete(`${BLOGS_PATH}/001`).set('Authorization', 'Basic ' + '1111111');
        expect(res.status).toBe(HttpStatus.Unauthorized);
        expect(dataRepository.returnLength()).toBe(3);


        const anotherRes = await request(testApp).delete(`${BLOGS_PATH}/001`).set('Authorization', '1111111 ' + 'YWRtaW46cXdlcnR5');
        expect(anotherRes.status).toBe(HttpStatus.Unauthorized);
        expect(dataRepository.returnLength()).toBe(3);
    });

    it("DELETE '/api/blogs/{id}' - should delete a blog", async() => {
        expect(dataRepository.returnLength()).toBe(3);

        const res = await request(testApp).delete(`${BLOGS_PATH}/001`).set('Authorization', 'Basic ' + 'YWRtaW46cXdlcnR5');
        expect(dataRepository.returnLength()).toBe(2);
    });

    it("DELETE '/api/blogs/{id}' - shouldn't be able to find non-existent blog entry, should give a proper return-code", async() => {
        expect(dataRepository.returnLength()).toBe(2);

        const anotherResults = await request(testApp).get(`${BLOGS_PATH}/001`);
        expect(anotherResults.status).toBe(HttpStatus.NotFound);
    });
});





