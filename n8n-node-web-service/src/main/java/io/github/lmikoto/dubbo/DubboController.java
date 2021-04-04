package io.github.lmikoto.dubbo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author liuyang
 * 2021/4/4 5:36 下午
 */
@RestController
@RequestMapping("/api/dubbo")
public class DubboController {

    @PostMapping("/invoke")
    public Object invoke(@RequestBody  DubboEntity entity){
        return DubboUtils.invoke(entity);
    }
}
