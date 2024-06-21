const { Kafka, Partitioners } = require('kafkajs');


class KafkaProducer extends Kafka {
  constructor(config) {
    super(config);
    this.messageProducer = this.producer({
      createPartitioner: Partitioners.LegacyPartitioner
    });
  }

  send = async (topic, body) => {
    const buffer = Buffer.from(JSON.stringify(body));

    await this.messageProducer.connect();
    await this.messageProducer.send({
      topic: topic,
      messages: [
        {value: buffer}
      ]
    });
  };
}

module.exports = KafkaProducer;
