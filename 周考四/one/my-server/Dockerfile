# 使用明确的多阶段结构，确保最终镜像包含 Node.js
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# 生产镜像直接继承 Node 环境
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/package*.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# 用 JSON 数组格式指定命令 ✅
CMD ["node", "dist/main.js"]
