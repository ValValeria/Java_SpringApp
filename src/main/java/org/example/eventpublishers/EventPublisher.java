package org.example.eventpublishers;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.stereotype.Component;
import java.util.function.BiConsumer;


@Component
public class EventPublisher implements ApplicationEventPublisherAware {
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public void publishEvent(BiConsumer<ApplicationEventPublisherAware, ApplicationEventPublisher> biConsumer){
        biConsumer.accept(this,this.applicationEventPublisher);
    }
}
