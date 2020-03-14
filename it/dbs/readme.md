---

---

# Databases

[[toc]]

## SQL

Primary Key

```sql
ALTER TABLE [dbo].[evaluation_has_evaluationStatus] ADD PRIMARY KEY ([evaluationId],[evaluationStatusId]);
ALTER TABLE [dbo].[evaluation_has_evaluationStatus] ADD PRIMARY KEY ([evaluationId]); 
```

Foreign Key

```sql
ALTER TABLE [dbo].[evaluation_has_evaluationStatus] ADD CONSTRAINT FK_evaluationStatusHSEvaluationStatusId_evaluationStatus FOREIGN KEY ([evaluationStatusId]) REFERENCES [dbo].[evaluationStatus]([id]); 
```

Ajout de colonne

```sql
ALTER TABLE [dbo].[evaluation] ADD planActionId INT NULL; 
```

Edition de colonne

```sql
ALTER TABLE TableName ALTER COLUMN ColumnName NVARCHAR(200) [NULL | NOT NULL] 
```

Mysqldump

```bash
mysqldump -h serveur.db.com -u $USERNAME$ -p"$PWD$" --databases $DBNAME$ > /Volumes/Data/dump.sql
```

## MongoDB
