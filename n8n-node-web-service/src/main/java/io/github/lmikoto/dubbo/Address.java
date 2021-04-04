package io.github.lmikoto.dubbo;

import com.google.common.collect.Sets;

import java.util.Set;
/**
 * @author liuyang
 * 2021/2/5 10:27 上午
 */
public enum Address {

    /**
     * dubbo url
     */
    DUBBO,
    /**
     * 注册中心 url
     */
    REGISTRY,
    /**
     * 未知
     */
    UNKNOWN;


    /**
     * todo 补上其他注册中心
     */
    private static final Set<String> REGISTRY_PREFIXES = Sets.newHashSet("zookeeper", "nacos");

    public static Address getAddressType(String address){
        if(address.startsWith("dubbo")){
            return DUBBO;
        }
        for (String registryPrefix : REGISTRY_PREFIXES) {
            if (address.startsWith(registryPrefix)) {
                return REGISTRY;
            }
        }
        return UNKNOWN;
    }
}
