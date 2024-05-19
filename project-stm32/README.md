# Board Config (.ioc)
## UARTs
1. Enable USART1 for reading data from GPS module  
   ![Screen Shot 2024-05-20 at 1 38 08 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/f941792c-f561-4660-962b-4afd3de5360a)
2. Enable USART6 for sending data to NodeMCU(ESP8266).  
   ![Screen Shot 2024-05-20 at 1 38 53 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/80b1a89d-168a-44a1-932e-7f0916d263ea)
3. Enable USART2 for debugging(should already be enabled by default).  
   ![Screen Shot 2024-05-20 at 1 40 59 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/da8eda00-190e-4fba-84ef-8bfed82667d5)
## Analog
1. Enable ADC1 for reading data from PM2.5 sensor. (use default parameter setting)  
   ![Screen Shot 2024-05-20 at 1 42 10 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/bd7684c8-5e42-448f-9ad3-7e3900809b49)
## Timers
1. Enable TIM1.  
   ![Screen Shot 2024-05-20 at 1 43 42 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/6c62a92e-4965-40e3-835a-902252643624)
2. Set clock configuration.  
   ![Screen Shot 2024-05-20 at 1 44 29 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/9d192cb3-7cdf-4faa-b76d-39afe39d7e38)  
ps. with these configs, TIM1 will call callback function every 15 seconds.

# Pins Config
should look like this (Don't forget to set PC0 PC1 PB0 to GPIO_Output for LED(Green Yellow Red in order))  
![Screen Shot 2024-05-20 at 1 46 44 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/3c05c08a-05bb-4c1c-a0dd-9acf29b19e5c)

# Wiring
## PM2.5 sensor
![Screen Shot 2024-05-20 at 1 48 03 AM](https://github.com/ZigmaZero/emb-lab-pm25-detector/assets/112265202/81c37f6f-a3a9-49d6-bebf-dd03d7441083)
1. Connect PA1(ADC1) to Vo.  
2. Don't connect LED wire(use to control LED in the sensor but I decide to let it on all the time).  
3. The rest should be easy!
## GPS module
1. Connect PA10(USART1_RX) to TXD.
2. No need to connect RXD since we're not sending anything to the GPS module.
3. No need to connect PPS, it is for time accuracy but we'll ignore that.
4. The rest should be easy!
## NodeMCU(ESP8266)
1. Connect NodeMCU's VIN to 5V of STM32. This is to power NodeMCU.
2. Connect NodeMCU's G to GND of STM32. This is ground wire.
3. Connect PC6(USART6_TX) to NodeMCU's D7(is set to be RX pin).
## LED(traffic light)
1. Connect PC0 to G.
2. Connect PC1 to Y.
3. Connect PB0 to R.
4. GND to GND.
