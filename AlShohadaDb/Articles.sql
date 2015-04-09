CREATE TABLE [dbo].[Articles]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [title] NVARCHAR(50) NULL, 
    [description] NVARCHAR(MAX) NULL, 
    [Date] DATETIME NULL
)
