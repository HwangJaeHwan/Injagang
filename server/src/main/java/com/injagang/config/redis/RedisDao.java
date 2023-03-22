package com.injagang.config.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisDao {

    private final RedisTemplate<String, String> redisTemplate;


    public void setData(String key, String value, Long mill) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();

        ops.set(key, value, mill, TimeUnit.MILLISECONDS);

    }

    public String getData(String key){
        ValueOperations<String, String> ops = redisTemplate.opsForValue();

        return ops.get(key);
    }

    public void delete(String key) {
        redisTemplate.delete(key);

    }

    public void clear() {
        redisTemplate.getConnectionFactory().getConnection().flushAll();
    }






}
