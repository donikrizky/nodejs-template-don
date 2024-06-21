//this would save all topics
const TOPIC = Object.freeze({
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  COMPANY_CREATED: 'company.created',
  COMPANY_UPDATED: 'company.updated',
  SAMPLE_CREATED: 'sample.created',
  SAMPLE_UPDATED: 'sample.updated',
  PENGAJUAN_EVENT_CREATED : 'svc-spbe-pengajuan-event-submit',
  VERIFIKASI_VENUE_SUCCESS: 'svc-spbe-verifikasi-venue-success',
  REJECTED_EVENT: 'svc-spbe-pengajuan-event-event-rejected',
  REVIEWED_DISPAREKRAF: "svc-spbe-verifikasi-disparekraf-reviewed-success"
});

module.exports = {
  TOPIC,
};
