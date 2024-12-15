import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="text-4xl mr-4">{icon}</span>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    )
  }