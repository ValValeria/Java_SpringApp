package org.example.config;

import org.example.converter.CategoryConverter;
import org.example.converter.DateConverter;
import org.example.interceptors.AuthInterceptor;
import org.example.interceptors.SetupFolders;
import org.example.service.AuthService;
import org.springframework.beans.BeansException;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import java.util.HashSet;
import java.util.Set;


@Configuration
@EnableWebMvc
@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableCaching
@ComponentScan(basePackages = "org.example")
public class WebConfig implements WebMvcConfigurer, ApplicationContextAware {
    ApplicationContext applicationContext;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/public/**").addResourceLocations("/resources/");
    }

    @Bean
    InternalResourceViewResolver viewResolver(){
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp" );
        resolver.setRequestContextAttribute("requestContext");
        return resolver;
    }

    @Bean
    ConversionServiceFactoryBean conversionService() {
        ConversionServiceFactoryBean bean = new ConversionServiceFactoryBean();
        Set<Object> converters = new HashSet<>();
        converters.add(new DateConverter());
        converters.add(new CategoryConverter());
        bean.setConverters(converters);
        return bean;
    }

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("posts","user", "post", "categories");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(this.applicationContext.getBean(AuthInterceptor.class));
        registry.addInterceptor(new SetupFolders());
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Bean StandardServletMultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource
                = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:application");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
    }

    @Bean
    public UserDetailsService getUserDetailsService(){
        return this.applicationContext.getBean(AuthService.class);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
