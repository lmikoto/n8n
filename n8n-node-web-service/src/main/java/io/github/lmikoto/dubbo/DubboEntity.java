package io.github.lmikoto.dubbo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * @author liuyang
 * 2021/4/4 6:42 下午
 */
@Data
public class DubboEntity {

    private String address;

    private String interfaceName;

    private String methodName;

    private String version;

    private Integer timeout;

    private Params params;


    public String[] getMethodType(){
        return params.methodType;
    }

    public Object[] getParam(){
        return params.param;
    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Params{

        private String[] methodType;

        private Object[] param;
    }


}
