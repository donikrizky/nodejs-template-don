const { Kafka } = require('kafkajs');
const logger = require('../../../helpers/utils/logger');

class KafkaConsumer extends Kafka {
  constructor(config, groupId, topic, handler) {
    super({
      ...config
    });

    this.messageConsumer = this.consumer({
      groupId: groupId,
      allowAutoTopicCreation: true,
      readUncommitted: true,
    });
    this.topic = topic;
    this.handler = handler;
    this.ctx = this.constructor.name;
  }

  async subscribe() {
    const run = async () => {
      await this.messageConsumer.connect();
      await this.messageConsumer.subscribe({ topic: this.topic, fromBeginning: true });
      await this.messageConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          await this.handler(message.value)
          await this.messageConsumer.commitOffsets([
            {
              topic: topic,
              partition: partition,
              offset: message.offset
            }
          ]);
        },
      });
    };

    try {
      await run();
    } catch(err) {
      logger.log(this.ctx, err.message, 'Kafka Subscribe');
    }
  }
}

module.exports = KafkaConsumer;
