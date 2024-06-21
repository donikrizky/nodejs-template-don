// kafkaConsumer.test.js

const { expect } = require('chai');
const sinon = require('sinon');
const KafkaConsumer = require('../../../../bin/helpers/message-brokers/kafka/consumer'); // Adjust the path accordingly

describe.skip('KafkaConsumer', () => {
    it('should call the handler with the message value', async () => {
        // Arrange
        const config = {}; // Your Kafka configuration
        const groupId = 'my-group';
        const topic = 'my-topic';
        const handler = sinon.stub();
        const consumer = new KafkaConsumer(config, groupId, topic, handler);

        // Act
        await consumer.subscribe();

        // Simulate receiving a Kafka message
        const message = {
            value: 'Hello, Kafka!'
        };
        await consumer.messageConsumer.eachMessage({
            topic,
            partition: 0,
            message
        });

        // Assert
        expect(handler.calledOnce).to.be.true;
        expect(handler.calledWithExactly('Hello, Kafka!')).to.be.true;
    });

    // Add more test cases as needed
});
