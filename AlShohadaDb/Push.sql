CREATE TABLE [dbo].[Push]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Platform] VARCHAR(500) NULL, 
    [Token] VARCHAR(500) NULL, 
    [CreatedDate] DATETIME NULL, 
    [ModifiedDate] DATETIME NULL, 
    [OsVersion] VARCHAR(100) NULL, 
    [AppVersion] VARCHAR(100) NULL, 
    [Udid] VARCHAR(500) NULL
)
