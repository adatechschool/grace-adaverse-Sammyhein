ALTER TABLE "student_projects" ALTER COLUMN "date_creation" SET DEFAULT CURRENT_DATE;--> statement-breakpoint
ALTER TABLE "student_projects" ALTER COLUMN "date_creation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ALTER COLUMN "date_published" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "student_projects" ALTER COLUMN "date_published" DROP NOT NULL;