CREATE TABLE [dbo].[Lectures]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [vtitle] NVARCHAR(50) NULL, 
    [vdescription] NVARCHAR(MAX) NULL, 
    [vlocation] NVARCHAR(MAX) NULL, 
    [vstatus] INT NULL, 
    [date] DATETIME NULL
)
