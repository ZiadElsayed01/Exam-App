export interface IAuditLog {
  id: string;
  createdAt: string;
  actorUserId: string;
  actorUsername: string;
  actorEmail: string;
  actorRole: string;
  category: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: {
    title: string;
    diplomaId?: string;
    examId?: string;
    keys?: [];
  };
  ipAddress: string;
  userAgent: string;
  httpMethod: string;
  path: string;
}
