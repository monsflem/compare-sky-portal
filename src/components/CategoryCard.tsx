
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  providers: string[];
}

const CategoryCard = ({ title, description, icon, link, providers }: CategoryCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex items-center justify-center mb-4 text-sky-600">
          {icon}
        </div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 text-center mb-4">{description}</p>
        <div className="text-sm text-slate-500 mb-2">Top providers:</div>
        <ul className="text-sm text-slate-700 mb-4">
          {providers.map((provider, index) => (
            <li key={index} className="mb-1">{provider}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-center">
        <Link to={link} className="btn-primary w-full text-center">Compare {title}</Link>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
