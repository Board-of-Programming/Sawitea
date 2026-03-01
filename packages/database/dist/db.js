"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.pool = exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema = __importStar(require("./schema"));
exports.schema = schema;
// Create PostgreSQL connection pool
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.pool = pool;
// Create Drizzle client
exports.db = (0, node_postgres_1.drizzle)(pool, { schema });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQW9EO0FBQ3BELDJCQUEwQjtBQUMxQixpREFBbUM7QUFjMUIsd0JBQU07QUFaZixvQ0FBb0M7QUFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFJLENBQUM7SUFDcEIsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZO0NBQzNDLENBQUMsQ0FBQztBQU1NLG9CQUFJO0FBSmIsd0JBQXdCO0FBQ1gsUUFBQSxFQUFFLEdBQUcsSUFBQSx1QkFBTyxFQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkcml6emxlIH0gZnJvbSBcImRyaXp6bGUtb3JtL25vZGUtcG9zdGdyZXNcIjtcclxuaW1wb3J0IHsgUG9vbCB9IGZyb20gXCJwZ1wiO1xyXG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSBcIi4vc2NoZW1hXCI7XHJcblxyXG4vLyBDcmVhdGUgUG9zdGdyZVNRTCBjb25uZWN0aW9uIHBvb2xcclxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcclxuICBjb25uZWN0aW9uU3RyaW5nOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwsXHJcbn0pO1xyXG5cclxuLy8gQ3JlYXRlIERyaXp6bGUgY2xpZW50XHJcbmV4cG9ydCBjb25zdCBkYiA9IGRyaXp6bGUocG9vbCwgeyBzY2hlbWEgfSk7XHJcblxyXG4vLyBFeHBvcnQgcG9vbCBmb3IgcmF3IHF1ZXJpZXMgaWYgbmVlZGVkXHJcbmV4cG9ydCB7IHBvb2wgfTtcclxuXHJcbi8vIEV4cG9ydCBzY2hlbWFcclxuZXhwb3J0IHsgc2NoZW1hIH07XHJcbiJdfQ==