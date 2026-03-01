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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.pool = exports.db = exports.auth = void 0;
// Export Better Auth
var auth_1 = require("./auth");
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return auth_1.auth; } });
// Export Database client
var db_1 = require("./db");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return db_1.db; } });
Object.defineProperty(exports, "pool", { enumerable: true, get: function () { return db_1.pool; } });
Object.defineProperty(exports, "schema", { enumerable: true, get: function () { return db_1.schema; } });
// Export Schemas
__exportStar(require("./schema"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUI7QUFDckIsK0JBQThCO0FBQXJCLDRGQUFBLElBQUksT0FBQTtBQUdiLHlCQUF5QjtBQUN6QiwyQkFBd0M7QUFBL0Isd0ZBQUEsRUFBRSxPQUFBO0FBQUUsMEZBQUEsSUFBSSxPQUFBO0FBQUUsNEZBQUEsTUFBTSxPQUFBO0FBRXpCLGlCQUFpQjtBQUNqQiwyQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnQgQmV0dGVyIEF1dGhcclxuZXhwb3J0IHsgYXV0aCB9IGZyb20gXCIuL2F1dGhcIjtcclxuZXhwb3J0IHR5cGUgeyBBdXRoIH0gZnJvbSBcIi4vYXV0aFwiO1xyXG5cclxuLy8gRXhwb3J0IERhdGFiYXNlIGNsaWVudFxyXG5leHBvcnQgeyBkYiwgcG9vbCwgc2NoZW1hIH0gZnJvbSBcIi4vZGJcIjtcclxuXHJcbi8vIEV4cG9ydCBTY2hlbWFzXHJcbmV4cG9ydCAqIGZyb20gXCIuL3NjaGVtYVwiO1xyXG4iXX0=