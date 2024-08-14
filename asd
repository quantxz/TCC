int sinal = 0;

void setup()
{
  Serial.begin(9600);
}

void loop() 
{
	sinal = analogRead(A0);
	Serial.println(sinal);
	delay(300);
}
