import { TemplateType } from "@prisma/client";

type TemplateRequestData = {
    parentId: string;
    name: string;
    type: TemplateType;
    id?: string;
}

export const template1: TemplateRequestData = {
    "parentId": "a020cd53-c518-4338-ba69-9d3c37d22892",
    "name": "Template 1",
    "type": "TEMPLATE_A"
};

export const template2: TemplateRequestData = {
    "parentId": "a020cd53-c518-4338-ba69-9d3c37d22892",
    "name": "Template 2",
    "type": "TEMPLATE_B"
};