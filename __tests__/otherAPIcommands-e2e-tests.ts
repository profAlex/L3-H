import express from "express";
import {setupApp} from "../src/setup-app";
import {dataRepository} from "../src/repository/blogger-mongodb-repository";
import request from "supertest";
import {TESTING_PATH} from "../src/routers/router-pathes";
import {HttpStatus} from "../src/core/http-statuses";
import {runDB} from "../src/db/mongo.db";

describe("Test API commands for testing", () => {
    it("DELETE ALL '/api/testing/all-data/' - should delete whole repository", async() => {
        const testApp = express();
        setupApp(testApp);
        await runDB();

        //expect(dataRepository.returnLength()).toBe(2);
        const res = await request(testApp).delete(`${TESTING_PATH}/all-data/`);
        expect(await dataRepository.returnBloggersAmount()).toBe(0);

        expect(res.status).toBe(HttpStatus.NoContent);
    });
});