package com.passwordreminder.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController{

    @RequestMapping(value = "/{path:^(?!api|static|assets|css|js|images|favicon\\.ico).*}/**")
    public String forwardReactRoutes() {
        return "forward:/index.html";
    }
}
