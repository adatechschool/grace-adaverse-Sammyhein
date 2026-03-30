CREATE TABLE "ada_projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ada_projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promotions_ada" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "promotions_ada_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"starting_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "student_projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(50) NOT NULL,
	"image_url" text NOT NULL,
	"slug" varchar(50) NOT NULL,
	"github_url" text NOT NULL,
	"demo_url" text NOT NULL,
	"date_creation" date NOT NULL,
	"date_published" date DEFAULT CURRENT_DATE NOT NULL,
	"ada_projects_id" integer NOT NULL,
	"promotion_ada_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_ada_projects_id_ada_projects_id_fk" FOREIGN KEY ("ada_projects_id") REFERENCES "public"."ada_projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_promotion_ada_id_promotions_ada_id_fk" FOREIGN KEY ("promotion_ada_id") REFERENCES "public"."promotions_ada"("id") ON DELETE no action ON UPDATE no action;