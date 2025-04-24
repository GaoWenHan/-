# 以官方Nginx镜像为基础
FROM nginx:alpine

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义配置文件到容器
COPY nginx.conf /etc/nginx/conf.d/

# 复制React构建产物到Nginx默认目录
COPY build /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
